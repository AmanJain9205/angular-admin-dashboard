import { ChangeDetectionStrategy, Component, inject, TemplateRef } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { IUserDetail } from '../../interfaces/user.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  imports: [FormsModule, CommonModule, NgbModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  public users: IUserDetail[] = [];
  public pagedUsers: IUserDetail[] = [];
  public filteredUsers: IUserDetail[] = [];
  public searchTerm = '';
  public selectedRole = '';
  public currentPage = 1;
  public totalPages = 1;
  public pageSize = 5;
  public modalOpen = false;
  public modalType: 'view' | 'edit' | 'delete' | null = null;
  public selectedUser: any = null;

  private userService = inject(UserService);
  private modalService = inject(NgbModal);

  public ngOnInit() {
    this.userService.users$.subscribe(users => {
      this.users = users;
      this.applyFilter();
    });
  }

  public applyFilter() {
  this.currentPage = 1;
  this.filteredUsers = this.users.filter(u =>
    (!this.selectedRole || u.role === this.selectedRole) &&
    (!this.searchTerm || u.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
  );
  this.updatePagination();
 }


  public updatePagination() {
  this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize) || 1;
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.pagedUsers = this.filteredUsers.slice(start, end);
 }

 public goToPage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.updatePagination();
 }

  public openModal(type: 'view' | 'edit' | 'delete', user: IUserDetail, content: TemplateRef<any>) {
    this.modalType = type;
    this.selectedUser = type === 'edit' ? { ...user } : user;
    this.modalService.open(content, { centered: true });
  }

  public closeModal() {
    this.modalOpen = false;
    this.modalType = null;
    this.selectedUser = null;
  }

  public saveEdit() {
    this.userService.editUser(this.selectedUser);
    this.closeModal();
  }

  confirmDelete() {
    this.userService.deleteUser(this.selectedUser.id);
    this.closeModal();
  }
}

