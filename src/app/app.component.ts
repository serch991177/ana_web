import { ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconComponent } from './icon.component';
import { BIRTHDAY_CONFIG, Coupon, CouponCategory } from './birthday.config';

type DialogContent = { kind: 'letter' } | { kind: 'coupon'; coupon: Coupon } | { kind: 'surprise' };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  readonly config = BIRTHDAY_CONFIG;
  readonly menuOpen = signal(false);
  readonly musicOpen = signal(false);
  // Dominio fijo de YouTube y videoId codificado: la URL no admite otros orígenes.
  readonly musicEmbedUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(
    `https://www.youtube.com/embed/${encodeURIComponent(this.config.music.videoId)}?autoplay=0&playsinline=1&rel=0&hl=es`,
  );
  readonly selectedCategory = signal<CouponCategory>('all');
  readonly dialogContent = signal<DialogContent | null>(null);
  readonly toast = signal('');
  readonly copyFallback = signal('');
  readonly confettiVisible = signal(false);
  readonly now = signal(Date.now());
  readonly modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  readonly filters: { id: CouponCategory; label: string }[] = [
    { id: 'all', label: 'Todos los planes' },
    { id: 'coffee', label: 'Cafecitos' },
    { id: 'plans', label: 'Algo diferente' },
  ];
  readonly coupons = computed(() => this.config.coupons.filter(coupon => this.selectedCategory() === 'all' || coupon.category === this.selectedCategory()));
  readonly birthdayState = computed(() => {
    if (this.now() < new Date(this.config.birthday).getTime()) return 'upcoming';
    if (this.now() < new Date(this.config.birthdayEnd).getTime()) return 'birthday';
    return 'celebrated';
  });
  readonly countdown = computed(() => {
    const remaining = Math.max(0, new Date(this.config.birthday).getTime() - this.now());
    const seconds = Math.floor(remaining / 1000);
    return [
      { value: String(Math.floor(seconds / 86400)).padStart(2, '0'), label: 'días' },
      { value: String(Math.floor((seconds % 86400) / 3600)).padStart(2, '0'), label: 'horas' },
      { value: String(Math.floor((seconds % 3600) / 60)).padStart(2, '0'), label: 'minutos' },
      { value: String(seconds % 60).padStart(2, '0'), label: 'segundos' },
    ];
  });
  readonly confettiPieces = Array.from({ length: 58 }, (_, i) => ({
    x: (i * 37) % 100,
    delay: ((i * 7) % 12) / 10,
    duration: 2.4 + (i % 5) / 4,
    rotation: (i * 63) % 360,
    color: ['#7c2235', '#dba77c', '#d17489', '#fff7ee', '#889175'][i % 5],
  }));

  private clock?: ReturnType<typeof setInterval>;
  private toastTimer?: ReturnType<typeof setTimeout>;
  private confettiTimer?: ReturnType<typeof setTimeout>;
  private focusReturn: HTMLElement | null = null;

  ngOnInit(): void {
    this.clock = setInterval(() => this.now.set(Date.now()), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.clock);
    clearTimeout(this.toastTimer);
    clearTimeout(this.confettiTimer);
    document.body.classList.remove('dialog-open');
  }

  closeMenu(): void { this.menuOpen.set(false); }

  openLetter(): void { this.openDialog({ kind: 'letter' }); }
  openCoupon(coupon: Coupon): void { this.openDialog({ kind: 'coupon', coupon }); }
  openSurprise(): void {
    this.openDialog({ kind: 'surprise' });
    this.celebrate();
  }

  private openDialog(content: DialogContent): void {
    this.focusReturn = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.copyFallback.set('');
    this.dialogContent.set(content);
    this.menuOpen.set(false);
    document.body.classList.add('dialog-open');
    this.modal()?.nativeElement.showModal();
  }

  closeDialog(): void { this.modal()?.nativeElement.close(); }

  onDialogClosed(): void {
    document.body.classList.remove('dialog-open');
    this.dialogContent.set(null);
    this.copyFallback.set('');
    this.focusReturn?.focus({ preventScroll: true });
  }

  onBackdropClick(event: MouseEvent): void {
    const dialog = this.modal()?.nativeElement;
    if (!dialog || event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) this.closeDialog();
  }

  @HostListener('window:resize')
  onResize(): void { if (window.innerWidth >= 768) this.menuOpen.set(false); }

  async copyCoupon(coupon: Coupon): Promise<void> {
    const invitation = `¡Hola, ${this.config.sender}! Me gustaría usar mi cupón de cumpleaños: «${coupon.subtitle}». ¿Qué día nos queda bien para compartir este plan? — ${this.config.recipient}`;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(invitation);
      this.copyFallback.set('');
      this.showToast('Invitación copiada. Envíamela y elegimos el día.');
    } catch {
      this.copyFallback.set(invitation);
      this.showToast('Mantén presionado el mensaje para copiarlo.');
    }
  }

  celebrate(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearTimeout(this.confettiTimer);
    this.confettiVisible.set(true);
    this.confettiTimer = setTimeout(() => this.confettiVisible.set(false), 5000);
  }

  private showToast(message: string): void {
    clearTimeout(this.toastTimer);
    this.toast.set(message);
    this.toastTimer = setTimeout(() => this.toast.set(''), 5000);
  }
}
