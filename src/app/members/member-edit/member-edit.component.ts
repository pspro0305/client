import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { AccountService } from '../../_Services/account.service';
import { MemberService } from '../../_Services/member.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;  //Viewchild directive to get access to the form
  @HostListener('window:beforeunload',
     ['$event']) unloadNotification($event: any){ // Added HostListener to listen to the window beforeunload event
    if(this.editForm?.dirty){ 
      $event.returnValue = true;
    }
  }
  member? : Member;
  private accountService = inject(AccountService);
  private memberService = inject(MemberService);
  private toaster = inject(ToastrService)

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    const user = this.accountService.currentUser();
    if(!user) return;
    this.memberService.getMember(user.username).subscribe({
      next: member => this.member = member
    });
  }

  updateMember(){
   this.memberService.updateMemeber(this.editForm?.value).subscribe({
     next: _ => {
       this.toaster.success('Profile updated successfully');
       this.editForm?.reset(this.member);
     }
  });
}
}
