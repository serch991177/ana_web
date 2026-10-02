import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Símbolos de Lucide, incluidos localmente en public/assets/icons.svg. */
@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use [attr.href]="\'assets/icons.svg#\' + name()" /></svg>',
  styles: [':host { display: inline-flex; width: 1.25rem; height: 1.25rem; flex-shrink: 0; } svg { width: 100%; height: 100%; display: block; }'],
})
export class IconComponent {
  readonly name = input.required<string>();
}
