/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     10/9/2024 8:58:37 PM                         */
/*==============================================================*/


/*==============================================================*/
/* Table: BINH_LUAN                                             */
/*==============================================================*/
create table BINH_LUAN
(
   ID_BINH_LUAN         int not null  comment '',
   ID_SAN_PHAM          int not null  comment '',
   ID_NGUOI_DUNG        int not null  comment '',
   DANH_GIA             int  comment '',
   NGAY_TAO_BAI_VIET    datetime  comment '',
   NOI_DUNG_CMT         varchar(255)  comment '',
   primary key (ID_BINH_LUAN)
);

/*==============================================================*/
/* Table: CHI_TIET_HOA_DON                                      */
/*==============================================================*/
create table CHI_TIET_HOA_DON
(
   ID_CHI_TIET_HOA_DON  int not null  comment '',
   ID_SAN_PHAM          int not null  comment '',
   ID_DON_HANG          int not null  comment '',
   SO_LUONG_SP          int  comment '',
   primary key (ID_CHI_TIET_HOA_DON)
);

/*==============================================================*/
/* Table: DON_HANG                                              */
/*==============================================================*/
create table DON_HANG
(
   ID_DON_HANG          int not null  comment '',
   ID_NGUOI_DUNG        int not null  comment '',
   ID_THANH_TOAN        int not null  comment '',
   TONG_TIEN            float  comment '',
   TRANG_THAI_DON_HANG  varchar(255)  comment '',
   GHI_CHU_DONHANG      varchar(255)  comment '',
   NGAY_CAP_NHAT_DONHANG datetime  comment '',
   NGAY_TAO_DONHANG     datetime  comment '',
   TRANG_THAI_DONHANG   varchar(255)  comment '',
   primary key (ID_DON_HANG)
);

/*==============================================================*/
/* Table: GIO_HANG                                              */
/*==============================================================*/
create table GIO_HANG
(
   ID_GIO_HANG          int not null  comment '',
   ID_SAN_PHAM          int not null  comment '',
   ID_NGUOI_DUNG        int not null  comment '',
   SO_LUONG_GIOHANG     int  comment '',
   primary key (ID_GIO_HANG)
);

/*==============================================================*/
/* Table: ID_BAI_VIET                                           */
/*==============================================================*/
create table ID_BAI_VIET
(
   ID_BAI_VIET          int not null  comment '',
   ID_NGUOI_DUNG        int not null  comment '',
   TIEU_DE              varchar(255)  comment '',
   NGAY_TAO_BLOG        datetime  comment '',
   NGAY_CAP_NHAT_BAIVIET datetime  comment '',
   NOI_DUNG_BAIVIET     varchar(255)  comment '',
   TRANG_THAI_BAIVIET   varchar(255)  comment '',
   HINH_ANH_BAIVIET     varchar(255)  comment '',
   primary key (ID_BAI_VIET)
);

/*==============================================================*/
/* Table: KICH_CO                                               */
/*==============================================================*/
create table KICH_CO
(
   ID_KICH_CO           int not null  comment '',
   KICH_CO              varchar(255)  comment '',
   TRANG_THAI_KICH_CO   varchar(255)  comment '',
   primary key (ID_KICH_CO)
);

/*==============================================================*/
/* Table: LOAI_DANH_MUC                                         */
/*==============================================================*/
create table LOAI_DANH_MUC
(
   ID_DANH_MUC          varchar(255) not null  comment '',
   TEN_DANH_MUC         varchar(255)  comment '',
   MO_TA_LOAI_DANH_MUC  varchar(255)  comment '',
   TRANG_THAI_DANHMUC   varchar(255)  comment '',
   primary key (ID_DANH_MUC)
);

/*==============================================================*/
/* Table: NGUOI_DUNG                                            */
/*==============================================================*/
create table NGUOI_DUNG
(
   ID_NGUOI_DUNG        int not null  comment '',
   TEN_DANG_NHAP        varchar(255)  comment '',
   MAT_KHAU             varchar(255)  comment '',
   EMAIL                varchar(255)  comment '',
   VAI_TRO              varchar(255)  comment '',
   HO_TEN               varchar(255)  comment '',
   SO_DIEN_THOAI        varchar(255)  comment '',
   DIA_CHI              varchar(255)  comment '',
   TRANG_THAI_USER      varchar(255)  comment '',
   NGAY_TAO_USER        datetime  comment '',
   NGAY_CAP_NHAT_USER   varchar(255)  comment '',
   primary key (ID_NGUOI_DUNG)
);

/*==============================================================*/
/* Table: SAN_PHAM                                              */
/*==============================================================*/
create table SAN_PHAM
(
   ID_SAN_PHAM          int not null  comment '',
   ID_DANH_MUC          varchar(255) not null  comment '',
   TEN_SAN_PHAM         varchar(255)  comment '',
   GIA                  float  comment '',
   MO_TA_SAN_PHAM       varchar(255)  comment '',
   HINH_ANH_SANPHAM     varchar(255)  comment '',
   TRANG_THAI_SANPHAM   varchar(255)  comment '',
   NGAY_TAO_SANPHAM     datetime  comment '',
   NGAY_CAP_NHAT_SANPHAM varchar(255)  comment '',
   SO_LUONG_SANPHAM     int  comment '',
   primary key (ID_SAN_PHAM)
);

/*==============================================================*/
/* Table: THANH_TOAN                                            */
/*==============================================================*/
create table THANH_TOAN
(
   ID_THANH_TOAN        int not null  comment '',
   PHUONG_THUC_THANH_TOAN varchar(255)  comment '',
   NGAY_THANH_TOAN      datetime  comment '',
   TRANG_THAI_THANH_TOAN varchar(266)  comment '',
   primary key (ID_THANH_TOAN)
);

/*==============================================================*/
/* Table: TIN_NHAN                                              */
/*==============================================================*/
create table TIN_NHAN
(
   ID_TIN_NHAN          int not null  comment '',
   ID_NGUOI_DUNG        int not null  comment '',
   NGAY_TAO_TIN_NHAN    datetime  comment '',
   NOI_DUNG_TINNHAN     varchar(255)  comment '',
   primary key (ID_TIN_NHAN)
);

/*==============================================================*/
/* Table: YEU_THICH                                             */
/*==============================================================*/
create table YEU_THICH
(
   ID_YEU_THICH         int not null  comment '',
   ID_SAN_PHAM          int not null  comment '',
   ID_NGUOI_DUNG        int not null  comment '',
   primary key (ID_YEU_THICH)
);

/*==============================================================*/
/* Table: _UOC_KICH_CO                                          */
/*==============================================================*/
create table _UOC_KICH_CO
(
   ID_SAN_PHAM          int not null  comment '',
   ID_KICH_CO           int not null  comment '',
   primary key (ID_SAN_PHAM, ID_KICH_CO)
);

alter table BINH_LUAN add constraint FK_BINH_LUA_CO_BINH_L_NGUOI_DU foreign key (ID_NGUOI_DUNG)
      references NGUOI_DUNG (ID_NGUOI_DUNG) on delete restrict on update restrict;

alter table BINH_LUAN add constraint FK_BINH_LUA__UOC_BINH_SAN_PHAM foreign key (ID_SAN_PHAM)
      references SAN_PHAM (ID_SAN_PHAM) on delete restrict on update restrict;

alter table CHI_TIET_HOA_DON add constraint FK_CHI_TIET_CO_CHI_TI_DON_HANG foreign key (ID_DON_HANG)
      references DON_HANG (ID_DON_HANG) on delete restrict on update restrict;

alter table CHI_TIET_HOA_DON add constraint FK_CHI_TIET__UOC_CHI__SAN_PHAM foreign key (ID_SAN_PHAM)
      references SAN_PHAM (ID_SAN_PHAM) on delete restrict on update restrict;

alter table DON_HANG add constraint FK_DON_HANG_CO_THANH__THANH_TO foreign key (ID_THANH_TOAN)
      references THANH_TOAN (ID_THANH_TOAN) on delete restrict on update restrict;

alter table DON_HANG add constraint FK_DON_HANG_TAO__ON_H_NGUOI_DU foreign key (ID_NGUOI_DUNG)
      references NGUOI_DUNG (ID_NGUOI_DUNG) on delete restrict on update restrict;

alter table GIO_HANG add constraint FK_GIO_HANG_CO_SAN_PHAM foreign key (ID_SAN_PHAM)
      references SAN_PHAM (ID_SAN_PHAM) on delete restrict on update restrict;

alter table GIO_HANG add constraint FK_GIO_HANG_CO_GIO_HA_NGUOI_DU foreign key (ID_NGUOI_DUNG)
      references NGUOI_DUNG (ID_NGUOI_DUNG) on delete restrict on update restrict;

alter table ID_BAI_VIET add constraint FK_ID_BAI_V_CO_BAI_VI_NGUOI_DU foreign key (ID_NGUOI_DUNG)
      references NGUOI_DUNG (ID_NGUOI_DUNG) on delete restrict on update restrict;

alter table SAN_PHAM add constraint FK_SAN_PHAM_CO_DANH_M_LOAI_DAN foreign key (ID_DANH_MUC)
      references LOAI_DANH_MUC (ID_DANH_MUC) on delete restrict on update restrict;

alter table TIN_NHAN add constraint FK_TIN_NHAN_CO_TIN_NH_NGUOI_DU foreign key (ID_NGUOI_DUNG)
      references NGUOI_DUNG (ID_NGUOI_DUNG) on delete restrict on update restrict;

alter table YEU_THICH add constraint FK_YEU_THIC_CO_YEU_TH_NGUOI_DU foreign key (ID_NGUOI_DUNG)
      references NGUOI_DUNG (ID_NGUOI_DUNG) on delete restrict on update restrict;

alter table YEU_THICH add constraint FK_YEU_THIC__UOC_SAN_PHAM foreign key (ID_SAN_PHAM)
      references SAN_PHAM (ID_SAN_PHAM) on delete restrict on update restrict;

alter table _UOC_KICH_CO add constraint FK__UOC_KIC__UOC_KICH_SAN_PHAM foreign key (ID_SAN_PHAM)
      references SAN_PHAM (ID_SAN_PHAM) on delete restrict on update restrict;

alter table _UOC_KICH_CO add constraint FK__UOC_KIC__UOC_KICH_KICH_CO foreign key (ID_KICH_CO)
      references KICH_CO (ID_KICH_CO) on delete restrict on update restrict;

