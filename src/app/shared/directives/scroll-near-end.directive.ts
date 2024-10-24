import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Output,
} from '@angular/core';

@Directive({
  selector: '[app-scroll-near-end]',
  standalone: true,
})
export class ScrollNearEndDirective {
  private _el = inject(ElementRef);
  private window!: Window;

  @Output() nearEnd = new EventEmitter<void>();

  // Threshold in px to decide where is near of end page
  threshold = 100;

  ngOnInit() {
    // save window object for type safely
    this.window = window;
  }

  @HostListener('window:scroll', ['$event.target'])
  onScroll(e: KeyboardEvent) {
    // height of whole window page
    const heightOfWholePage = this.window.document.documentElement.scrollHeight;

    // height of parent element that apply this directive
    const heightOfElement = this._el.nativeElement.scrollHeight;

    // currently scrolled Y position
    const currentScrolledY = this.window.scrollY;

    // height of opened window - shrinks if console is opened
    const innerHeight = this.window.innerHeight;

    /**
     * The area between the start of the page and when this element
     * is visible in the parent component
     */
    const spaceOfElementAndPage = heightOfWholePage - heightOfElement;

    // calculated whether we are near the end
    const scrollToBottom =
      heightOfElement - innerHeight - currentScrolledY + spaceOfElementAndPage;

    if (scrollToBottom < this.threshold) {
      this.nearEnd.emit();
    }
  }
}
