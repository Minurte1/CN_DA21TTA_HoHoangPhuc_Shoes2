/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     11/2/2024 2:19:26 PM                         */
/*==============================================================*/


/*==============================================================*/
/* Table: BINH_LUAN                                             */
/*==============================================================*/
create table BINH_LUAN
(
   ID_BINH_LUAN         int not null auto_increment comment '',
   ID_SAN_PHAM          int not null  comment '',
   ID_NGUOI_DUNG        int not null  comment '',
   DANH_GIA             int  comment '',
   NGAY_TAO_BAI_VIET    datetime  comment '',
   NOI_DUNG_CMT         varchar(255)  comment '',
   primary key (ID_BINH_LUAN)
);

/*==============================================================*/
/* Table: CHAT_LIEU                                             */
/*==============================================================*/
create table CHAT_LIEU
(
   CHAT_LIEU_ID_        int not null auto_increment comment '',
   TEN_CHAT_LIEU_       varchar(255)  comment '',
   CREATED_TEN_CHAT_LIEU_ datetime  comment '',
   UPDATE_CHAT_LIEU     datetime  comment '',
   TRANG_THAI_CHAT_LIEU int  comment '',
   primary key (CHAT_LIEU_ID_)
);

/*==============================================================*/
/* Table: CHI_TIET_HOA_DON                                      */
/*==============================================================*/
create table CHI_TIET_HOA_DON
(
   ID_CHI_TIET_HOA_DON  int not null auto_increment comment '',
   ID_SAN_PHAM          int not null  comment '',
   ID_DON_HANG          int not null  comment '',
   SO_LUONG_SP          int  comment '',
   primary key (ID_CHI_TIET_HOA_DON)
);

/*==============================================================*/
/* Table: CO_KICH_CO                                            */
/*==============================================================*/
create table CO_KICH_CO
(
   ID_SAN_PHAM          int not null  comment '',
   ID_KICH_CO           int not null  comment '',
   primary key (ID_SAN_PHAM, ID_KICH_CO)
);

/*==============================================================*/
/* Table: DON_HANG                                              */
/*==============================================================*/
create table DON_HANG
(
   ID_DON_HANG          int not null auto_increment comment '',
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
/* Table: GIOI_TINH                                             */
/*==============================================================*/
create table GIOI_TINH
(
   GIOI_TINH_ID         int not null auto_increment comment '',
   TEN_GIOI_TINH        varchar(255)  comment '',
   CREATED_GIOI_TINH    datetime  comment '',
   UPDATE_GIOI_TINH     datetime  comment '',
   TRANG_THAI_GIOI_TINH int  comment '',
   primary key (GIOI_TINH_ID)
);

/*==============================================================*/
/* Table: GIO_HANG                                              */
/*==============================================================*/
create table GIO_HANG
(
   ID_GIO_HANG          int not null auto_increment comment '',
   ID_SAN_PHAM          int not null  comment '',
   ID_NGUOI_DUNG        int not null  comment '',
   SO_LUONG_GIOHANG     int  comment '',
   NGAY_CAP_NHAT_GIOHANG date  comment '',
   primary key (ID_GIO_HANG)
);

/*==============================================================*/
/* Table: ID_BAI_VIET                                           */
/*==============================================================*/
create table ID_BAI_VIET
(
   ID_BAI_VIET          int not null auto_increment comment '',
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
   ID_KICH_CO           int not null auto_increment comment '',
   KICH_CO              varchar(255)  comment '',
   TRANG_THAI_KICH_CO   varchar(255)  comment '',
   CREATED_KICH_CO      datetime  comment '',
   UPDATE_KICH_CO       datetime  comment '',
   primary key (ID_KICH_CO)
);

/*==============================================================*/
/* Table: LOAI_DANH_MUC                                         */
/*==============================================================*/
create table LOAI_DANH_MUC
(
   ID_DANH_MUC          int not null auto_increment comment '',
   TEN_DANH_MUC         varchar(255)  comment '',
   MO_TA_LOAI_DANH_MUC  varchar(255)  comment '',
   TRANG_THAI_DANHMUC   int  comment '',
   CREATED_DANH_MUC     datetime  comment '',
   UPDATE_DANH_MUC      datetime  comment '',
   primary key (ID_DANH_MUC)
);

/*==============================================================*/
/* Table: MAU_SAC                                               */
/*==============================================================*/
create table MAU_SAC
(
   MAU_SAC_ID           int not null auto_increment comment '',
   TEN_MAU_SAC          varchar(255)  comment '',
   CREATE_MAU_SAC       datetime  comment '',
   UPDATE_MAU_SAC       datetime  comment '',
   TRANG_THAI_MAU_SAC   int  comment '',
   primary key (MAU_SAC_ID)
);

/*==============================================================*/
/* Table: MAU_SAC_SAN_PHAM                                      */
/*==============================================================*/
create table MAU_SAC_SAN_PHAM
(
   ID_SAN_PHAM          int not null  comment '',
   MAU_SAC_ID           int not null  comment '',
   primary key (ID_SAN_PHAM, MAU_SAC_ID)
);

/*==============================================================*/
/* Table: MUC_DICH_SU_DUNG                                      */
/*==============================================================*/
create table MUC_DICH_SU_DUNG
(
   ID_MUC_DICH_SU_DUNG  int not null auto_increment comment '',
   TEN_MUC_DICH_SU_DUNG varchar(255)  comment '',
   CREATE_MUC_DICH_SU_DUNG datetime  comment '',
   UPDATE_MUC_DICH_SU_DUNG datetime  comment '',
   TRANG_THAI_MUC_DICH_SU_DUNG int  comment '',
   primary key (ID_MUC_DICH_SU_DUNG)
);

/*==============================================================*/
/* Table: MUC_DICH_SU_DUNG_SAN_PHAM                             */
/*==============================================================*/
create table MUC_DICH_SU_DUNG_SAN_PHAM
(
   ID_SAN_PHAM          int not null  comment '',
   ID_MUC_DICH_SU_DUNG  int not null  comment '',
   primary key (ID_SAN_PHAM, ID_MUC_DICH_SU_DUNG)
);

/*==============================================================*/
/* Table: NGUOI_DUNG                                            */
/*==============================================================*/
create table NGUOI_DUNG
(
   ID_NGUOI_DUNG        int not null auto_increment comment '',
   MAT_KHAU             varchar(255)  comment '',
   EMAIL                varchar(255)  comment '',
   VAI_TRO              varchar(255)  comment '',
   HO_TEN               varchar(255)  comment '',
   SO_DIEN_THOAI        varchar(255)  comment '',
   DIA_CHI              varchar(255)  comment '',
   TRANG_THAI_USER      varchar(255)  comment '',
   NGAY_TAO_USER        datetime  comment '',
   NGAY_CAP_NHAT_USER   varchar(255)  comment '',
   AVATAR               varchar(255)  comment '',
   primary key (ID_NGUOI_DUNG)
);

/*==============================================================*/
/* Table: PHONG_CACH_SAN_PHAM                                   */
/*==============================================================*/
create table PHONG_CACH_SAN_PHAM
(
   ID_SAN_PHAM          int not null  comment '',
   ID_PHUONG_CACH       int not null  comment '',
   primary key (ID_SAN_PHAM, ID_PHUONG_CACH)
);

/*==============================================================*/
/* Table: PHUONG_CACH                                           */
/*==============================================================*/
create table PHUONG_CACH
(
   ID_PHUONG_CACH       int not null auto_increment comment '',
   TEN_PHUONG_CACH      varchar(255)  comment '',
   CREATED_PHONG_CACH   datetime  comment '',
   UPDATE_PHONG_CACH    datetime  comment '',
   TRANG_THAI_PHONG_CACH int  comment '',
   primary key (ID_PHUONG_CACH)
);

/*==============================================================*/
/* Table: SAN_PHAM                                              */
/*==============================================================*/
create table SAN_PHAM
(
   ID_SAN_PHAM          int not null auto_increment comment '',
   ID_THUONG_HIEU       int not null  comment '',
   ID_DANH_MUC          int not null  comment '',
   GIOI_TINH_ID         int not null  comment '',
   CHAT_LIEU_ID_        int not null  comment '',
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
   ID_THANH_TOAN        int not null auto_increment comment '',
   PHUONG_THUC_THANH_TOAN varchar(255)  comment '',
   NGAY_THANH_TOAN      datetime  comment '',
   TRANG_THAI_THANH_TOAN varchar(266)  comment '',
   primary key (ID_THANH_TOAN)
);

/*==============================================================*/
/* Table: THUONG_HIEU                                           */
/*==============================================================*/
create table THUONG_HIEU
(
   ID_THUONG_HIEU       int not null auto_increment comment '',
   TEN_THUONG_HIEU      varchar(255)  comment '',
   CREATE_THUONG_HIEU   varchar(255)  comment '',
   UPDATE_THUONG_HIEU   datetime  comment '',
   TRANG_THAI_THUONG_HIEU int  comment '',
   primary key (ID_THUONG_HIEU)
);

/*==============================================================*/
/* Table: TIN_NHAN                                              */
/*==============================================================*/
create table TIN_NHAN
(
   ID_TIN_NHAN          int not null auto_increment comment '',
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
   ID_YEU_THICH         int not null auto_increment comment '',
   ID_SAN_PHAM          int not null  comment '',
   ID_NGUOI_DUNG        int not null  comment '',
   primary key (ID_YEU_THICH)
);

alter table BINH_LUAN add constraint FK_BINH_LUA_CO_BINH_L_NGUOI_DU foreign key (ID_NGUOI_DUNG)
      references NGUOI_DUNG (ID_NGUOI_DUNG) on delete restrict on update restrict;

alter table BINH_LUAN add constraint FK_BINH_LUA__UOC_BINH_SAN_PHAM foreign key (ID_SAN_PHAM)
      references SAN_PHAM (ID_SAN_PHAM) on delete restrict on update restrict;

alter table CHI_TIET_HOA_DON add constraint FK_CHI_TIET_CO_CHI_TI_DON_HANG foreign key (ID_DON_HANG)
      references DON_HANG (ID_DON_HANG) on delete restrict on update restrict;

alter table CHI_TIET_HOA_DON add constraint FK_CHI_TIET__UOC_CHI__SAN_PHAM foreign key (ID_SAN_PHAM)
      references SAN_PHAM (ID_SAN_PHAM) on delete restrict on update restrict;

alter table CO_KICH_CO add constraint FK_CO_KICH__CO_KICH_C_SAN_PHAM foreign key (ID_SAN_PHAM)
      references SAN_PHAM (ID_SAN_PHAM) on delete restrict on update restrict;

alter table CO_KICH_CO add constraint FK_CO_KICH__CO_KICH_C_KICH_CO foreign key (ID_KICH_CO)
      references KICH_CO (ID_KICH_CO) on delete restrict on update restrict;

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

alter table MAU_SAC_SAN_PHAM add constraint FK_MAU_SAC__MAU_SAC_S_SAN_PHAM foreign key (ID_SAN_PHAM)
      references SAN_PHAM (ID_SAN_PHAM) on delete restrict on update restrict;

alter table MAU_SAC_SAN_PHAM add constraint FK_MAU_SAC__MAU_SAC_S_MAU_SAC foreign key (MAU_SAC_ID)
      references MAU_SAC (MAU_SAC_ID) on delete restrict on update restrict;

alter table MUC_DICH_SU_DUNG_SAN_PHAM add constraint FK_MUC_DICH_MUC_DICH__SAN_PHAM foreign key (ID_SAN_PHAM)
      references SAN_PHAM (ID_SAN_PHAM) on delete restrict on update restrict;

alter table MUC_DICH_SU_DUNG_SAN_PHAM add constraint FK_MUC_DICH_MUC_DICH__MUC_DICH foreign key (ID_MUC_DICH_SU_DUNG)
      references MUC_DICH_SU_DUNG (ID_MUC_DICH_SU_DUNG) on delete restrict on update restrict;

alter table PHONG_CACH_SAN_PHAM add constraint FK_PHONG_CA_PHONG_CAC_SAN_PHAM foreign key (ID_SAN_PHAM)
      references SAN_PHAM (ID_SAN_PHAM) on delete restrict on update restrict;

alter table PHONG_CACH_SAN_PHAM add constraint FK_PHONG_CA_PHONG_CAC_PHUONG_C foreign key (ID_PHUONG_CACH)
      references PHUONG_CACH (ID_PHUONG_CACH) on delete restrict on update restrict;

alter table SAN_PHAM add constraint FK_SAN_PHAM_BRAND_PRO_THUONG_H foreign key (ID_THUONG_HIEU)
      references THUONG_HIEU (ID_THUONG_HIEU) on delete restrict on update restrict;

alter table SAN_PHAM add constraint FK_SAN_PHAM_CHAT_LIEU_CHAT_LIE foreign key (CHAT_LIEU_ID_)
      references CHAT_LIEU (CHAT_LIEU_ID_) on delete restrict on update restrict;

alter table SAN_PHAM add constraint FK_SAN_PHAM_CO_DANH_M_LOAI_DAN foreign key (ID_DANH_MUC)
      references LOAI_DANH_MUC (ID_DANH_MUC) on delete restrict on update restrict;

alter table SAN_PHAM add constraint FK_SAN_PHAM_GIOI_TINH_GIOI_TIN foreign key (GIOI_TINH_ID)
      references GIOI_TINH (GIOI_TINH_ID) on delete restrict on update restrict;

alter table TIN_NHAN add constraint FK_TIN_NHAN_CO_TIN_NH_NGUOI_DU foreign key (ID_NGUOI_DUNG)
      references NGUOI_DUNG (ID_NGUOI_DUNG) on delete restrict on update restrict;

alter table YEU_THICH add constraint FK_YEU_THIC_CO_YEU_TH_NGUOI_DU foreign key (ID_NGUOI_DUNG)
      references NGUOI_DUNG (ID_NGUOI_DUNG) on delete restrict on update restrict;

alter table YEU_THICH add constraint FK_YEU_THIC__UOC_SAN_PHAM foreign key (ID_SAN_PHAM)
      references SAN_PHAM (ID_SAN_PHAM) on delete restrict on update restrict;

