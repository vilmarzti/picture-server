import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, Input, Host, TemplateRef, ViewContainerRef, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MoreComponent } from './more.component';

@Directive({
  selector: '[appVideoPopup]'
})
export class VideoPopupDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() appVideoPopup!: TemplateRef<object>;

  private unsubscribe = new Subject();
  private overlayRef!: OverlayRef;

  constructor(
    @Host() private moreComponent: MoreComponent,
    private overlay: Overlay,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.createOverlay();
  }

  ngAfterViewInit(): void {
    this.moreComponent.videoLinkClicked.asObservable().subscribe(() => {
      this.attachOverlay();
    })
  }

  ngOnDestroy(): void {
    this.detachOverlay();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private createOverlay(): void {
    const scrollStrategy = this.overlay.scrollStrategies.block();
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    this.overlayRef = this.overlay.create({
      positionStrategy, 
      scrollStrategy,
      hasBackdrop: true,
    })

    this.overlayRef
      .backdropClick()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.detachOverlay();
      })
  }

  private attachOverlay(): void {
    if (!this.overlayRef.hasAttached()) {
      const periodSelectorPortal = new TemplatePortal(
        this.appVideoPopup,
        this.vcr
      );

      this.overlayRef.attach(periodSelectorPortal);
    }
  }

  private detachOverlay(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
