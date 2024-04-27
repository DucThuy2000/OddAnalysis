import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnlyNumberDirective),
      multi: true,
    },
  ],
})
export class OnlyNumberDirective implements ControlValueAccessor {
  onChange!: (val: string) => void;
  onTouched!: () => void;
  value!: string;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  filterValue(value: string): string {
    return value.replace(/[^0-9]*/g, '');
  }

  @HostListener('input', ['$event.target.value'])
  onInputChange(value: string) {
    const filteredValue: string = this.filterValue(value);
    this.updateTextInput(filteredValue, this.value !== filteredValue);
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched();
  }

  private updateTextInput(value: string, propagateChange: boolean) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
    if (propagateChange) {
      this.onChange(value);
    }
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }

  writeValue(value: any): void {
    value = value ? String(value) : '';
    this.updateTextInput(value, false);
  }
}
