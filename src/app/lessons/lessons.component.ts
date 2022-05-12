import { Component, OnInit } from '@angular/core';
import { LessonsService } from "../services/lessons.service";
import { Observable, of } from 'rxjs';
import { Lesson } from "../model/lesson";
import { SwPush } from "@angular/service-worker";
import { NewsletterService } from "../services/newsletter.service";
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'lessons',
    templateUrl: './lessons.component.html',
    styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

    lessons$: Observable<Lesson[]>;
    isLoggedIn$: Observable<boolean>;

    sub: PushSubscription;

    readonly VAPID_PUBLIC_KEY = 'BCWStS1WTMDCCfwX8X3uOVp52l0Aj4xrN1xzz4gWozmMEYDueL1l3ckliz5ZCR-EHo2J_70FY3Y5hBKSgf7bQwQ'
    constructor(
        private lessonsService: LessonsService,
        private swPush: SwPush,
        private newsletterService: NewsletterService) {

    }

    ngOnInit() {
        this.loadLessons();
    }


    loadLessons() {
        this.lessons$ = this.lessonsService.loadAllLessons().pipe(catchError(err => of([])));
    }

    async subscribeToNotifications() {
        if (this.swPush.isEnabled) {
            try {
                this.sub = await this.swPush.requestSubscription({
                    serverPublicKey: this.VAPID_PUBLIC_KEY
                })

                console.log(this.sub);

                this.newsletterService.addPushSubscriber(this.sub).subscribe(
                    console.log,
                    console.error
                );
            } catch (error) {
                console.log(error);
            }
        }
    }

    sendNewsletter() {
        console.log('send letter');
        this.newsletterService.send().subscribe(
            console.log,
            console.error
        );
    }
}
