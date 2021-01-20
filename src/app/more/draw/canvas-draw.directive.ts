import { Directive, ElementRef, HostListener, Output, EventEmitter, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { AppTouchEvent } from './app-touch-event';
import { Stroke } from './stroke';


@Directive({
  selector: '[appCanvasDraw]'
})
export class CanvasDrawDirective implements AfterViewInit, OnChanges {
  @Output() newStrokeEvent = new EventEmitter<Stroke>();
  @Input() clear: number;

  public offset: [number, number] = [0, 0];
  private ismousedown = false;
  private touchStartPos: [number, number]
  private ctx: CanvasRenderingContext2D;
  private _el: ElementRef<HTMLCanvasElement>;

  constructor(
    el: ElementRef
  ) {
    this.ctx = el.nativeElement.getContext('2d')
    this._el = el;
  }

  ngAfterViewInit(): void {
    this.offset = [(this._el.nativeElement.offsetParent as HTMLElement).offsetLeft, this._el.nativeElement.offsetTop]
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.clear) {
      this.ctx.clearRect(0, 0, this._el.nativeElement.width, this._el.nativeElement.height);
    }
  }

  @HostListener('mousedown', ['$event']) mouseDown(event: MouseEvent) {
    this.ismousedown = true;
    let touchEvent = this.mouseToTouch(event);
    this.touchStart(touchEvent);
  }

  @HostListener('mousemove', ['$event']) mouseMove(event: MouseEvent) {
    if (this.ismousedown && this.touchStartPos) {
      let touchEvent = this.mouseToTouch(event);
      this.touchMove(touchEvent);
    }
  }

  @HostListener('mouseup', ['$event']) mouseUp(event: MouseEvent) {
    this.ismousedown = false;
    let touchEvent = this.mouseToTouch(event);
    this.touchEnd(touchEvent);
  }

  @HostListener('touchstart', ['$event']) touchStart(event: TouchEvent | AppTouchEvent) {
    let x = event.touches[0].clientX - this.offset[0];
    let y = event.touches[0].clientY - this.offset[1];
    this.touchStartPos = [x, y];

    let stroke: Stroke = {
      type: 'start',
      x: x,
      y: y,
      ev: 0,
      ts: new Date().getTime()
    }

    this.newStrokeEvent.emit(stroke);
  }


  @HostListener('touchmove', ['$event']) touchMove(event: TouchEvent | AppTouchEvent) {
    let x = event.touches[0].clientX - this.offset[0];
    let y = event.touches[0].clientY - this.offset[1];

    // setup to draw liine
    this.ctx.beginPath();
    this.ctx.moveTo(this.touchStartPos[0], this.touchStartPos[1])

    // draw line
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.strokeStyle = 'black'
    // update touchStartPos
    this.touchStartPos = [x, y];

    // create stroke for Emission
    let stroke: Stroke = {
      type: 'move',
      x: x,
      y: y,
      ev: 0,
      ts: new Date().getTime()
    }
    this.newStrokeEvent.emit(stroke)
  }

  @HostListener('touchend', ['$event']) touchEnd(event: TouchEvent | AppTouchEvent) {
    let x, y: number;
    if (window.TouchEvent && event instanceof TouchEvent) {
      x = this.touchStartPos[0];
      y = this.touchStartPos[1];
    } else {
      x = event.touches[0].clientX - this.offset[0];
      y = event.touches[0].clientY - this.offset[1];
    }
    // setup to draw liine
    this.ctx.beginPath();
    this.ctx.moveTo(this.touchStartPos[0], this.touchStartPos[1])

    // draw line
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.strokeStyle = 'black'

    // create stroke for Emission
    let stroke: Stroke = {
      type: 'end',
      x: x,
      y: y,
      ev: 1,
      ts: new Date().getTime()
    }
    this.newStrokeEvent.emit(stroke)
  }

  private mouseToTouch(event: MouseEvent): AppTouchEvent {
    let touchEvent = new AppTouchEvent('', [{
      clientX: event.clientX,
      clientY: event.clientY
    }]);
    return touchEvent
  }

}