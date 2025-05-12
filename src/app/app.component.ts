import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SwPush } from "@angular/service-worker";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
 
  title = 'client';
  Body="this sample"
brijesh:any;
  constructor(private _swPush: SwPush, private http:HttpClient) {}

  ngOnInit() {
    this.requestSubscription();
  }

  requestSubscription = () => {
    if (!this._swPush.isEnabled) {
      console.log("Notification is not enabled.");
      return;
    }

    this._swPush.requestSubscription({
      serverPublicKey: 'BHAr3_kphiaRAJAL6wgO7p87xrmLR-bzbqcy5e-N3iXBXAVQ8HMhlcXUQnqDHyEqk1cmJLhlijR8823zY67fZ_w'
    }).then((_) => {
      this.brijesh=JSON.stringify(_);
      console.log(JSON.stringify(_));
    }).catch((_) => console.log);
  };


  send(){
    const val={
  subscription: {"endpoint":"https://fcm.googleapis.com/fcm/send/esf4feXwvpg:APA91bEOC0eMn_SSx36vlXmRKsftb8Ai3eFstGTg4L4n1inxbTrttRVPP1FSL_1XEN-K5tvmumdZqZ5uIW4RfhcvMS6KppkzjVtLjL_h7o5qiM-8iBxN_H2koEdSVLYMmT37KUIa57tK","expirationTime":null,"keys":{"p256dh":"BNUNT49na81_kA9XCTjjwNuBwroa12W0-xkR-1RdRVXWFbiGtXuMPGHDQUtOpImMBYK8pOxROTKKzk0cjGT0OuY","auth":"Hq_S1PSKgGck4IKrlJYr0g"}},
  
  payload: {
    notification: {
      title: this.title,
      body: this.Body,
      icon: "assets/icons/icon-512x512.png",
      data: {
        url: "https://www.ssavr.com/"
      }
    }
  }
 
}
    // this.http.post("https://notificationserver-nce0.onrender.com/send-notification",val).subscribe((data)=>{

    // })
    this.http.post(
  "https://notificationserver-nce0.onrender.com/send-notification",
  val,
).subscribe({
  next: (data) => console.log("Notification sent", data),
  error: (err) => console.error("Error", err)
});
  }
}
