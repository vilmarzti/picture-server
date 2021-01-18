import { AfterViewInit, Directive, Host, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { Subject } from 'rxjs';
import { VoteIdComponent } from './vote-id.component';
import { takeUntil } from 'rxjs/operators';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[appInfoPopup]'
})
export class InfoPopupDirective implements OnInit, OnDestroy, AfterViewInit{
  @Input() appInfoPopup!: TemplateRef<object>;

  private unsubscribe = new Subject();
  private overlayRef!: OverlayRef;

  constructor(
    @Host() private voteId: VoteIdComponent,
    private overlay: Overlay,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit(): void{
    this.createOverlay();
  }

  ngAfterViewInit(): void{
    this.voteId.infoButtonClicked.asObservable().subscribe(() => {
      this.attachOverlay();
    })

    this.voteId.closeButtonClicked.asObservable().subscribe(() => {
      this.detachOverlay();
    })
  }

  ngOnDestroy(): void {
    this.detachOverlay();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private createOverlay(): void {
    const scrollStrategy = this.overlay.scrollStrategies.block();
    const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy, 
      hasBackdrop: true,
    });

    this.overlayRef
      .backdropClick()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.detachOverlay();
      });
  }

  private attachOverlay(): void {
    if (!this.overlayRef.hasAttached()){
      const periodSelectorPortal = new TemplatePortal(
        this.appInfoPopup,
        this.vcr
      );

      this.overlayRef.attach(periodSelectorPortal);
    }
  }

  private detachOverlay(): void {
    if (this.overlayRef.hasAttached()){
      this.overlayRef.detach();
    }
  }
}
