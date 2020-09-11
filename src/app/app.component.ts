import { Component, HostListener } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'html-pdf-generator';
  public interval:any;
  public mobileview:boolean=false;
  public timeoutText:string="seconds";
  public timeLeft:number=1800;

  getParameterByname(paramName:any){
    let url=window.location.href;
    paramName=paramName.replace(/[[]]/g, "/$&");
    var regex= new RegExp("[?&]"+ paramName+ "(=([^&#]*)|&|#|$)"),
    results=regex.exec(url);
    if(!results) return null;
    if(!results[2]) return '';
    return decodeURIComponent(results[2].replace("/+/g", " "));

  }
  ngOnInit(){
    if(this.getParameterByname("userId")!=null){
      sessionStorage.setItem("name",this.getParameterByname("name"));
      sessionStorage.setItem("id",this.getParameterByname("id"));

    }
    if(window.innerWidth<1200){
      this.mobileview=true;
    }
  }

  public startTimer(){
    this.interval=setInterval(()=>{
      if(this.timeLeft==60){
        $("sessionModal").modal("show");
        this.timeoutText="seconds";
      }
      if(this.timeLeft==0){
        this.cancelTimer();
      }
      else if(this.timeLeft ==1){
        this.timeoutText="second";
      }
      else if(this.timeLeft<=60){
        this.timeoutText="seconds";
      }
      this.timeLeft--;
    },1000)  
  }

  public resetTimer(){
    this.timeLeft=1800;
    $("sessionModal").modal("hide");
    //this.login.resetSession();
    // simply health check the api
  }
  public cancelTimer(){
    $("sessionModal").modal("hide");
    clearInterval(this.interval);
    //this.logout(); 
    //same window open url == windows.location.href=url

  }

  @HostListener('window:resize' , ['$event'])
  onresize(event){
    if(window.innerWidth<1200){
      this.mobileview=true;
    }
    if(window.innerWidth>=1200){
      this.mobileview=false;
    }
  }

}
