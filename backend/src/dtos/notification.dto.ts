export class NotificationDTO {
  readonly type: string;
  readonly title: string;
  readonly message: string;
  readonly viewed: boolean;
  readonly created_at: Date;
}
