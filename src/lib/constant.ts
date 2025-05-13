export const UserStatus = {
  ACTIVE: {
    key: 'ACTIVE',
    value: 'Hoạt động',
    bgColor: 'bg-green-400',
  },
  PROHIBITIVE: {
    key: 'PROHIBITIVE',
    value: 'Bị cấm',
    bgColor: 'bg-red-400',
  },
};

export const QuestionType = {
  MULTICHOICE: {
    key: 'MULTICHOICE',
    value: 'Trắc nghiệm',
    bgColor: 'bg-blue-400', // Màu xám cho trạng thái khởi tạo
  },
  ESSAY: {
    key: 'ESSAY',
    value: 'Tự luận',
    bgColor: 'bg-yellow-400', // Màu xám cho trạng thái khởi tạo
  },
};

export const UserRole = {
  CUSTOMER: 'CUSTOMER',
  FREELANCER: 'FREELANCER',
};

export const WorkType = {
  BABYSITTING: {
    key: 'BABYSITTING',
    value: 'Trông trẻ',
    color: 'gray', // Màu xám cho trạng thái khởi tạo
  },
  HOUSECLEANING: {
    key: 'HOUSECLEANING',
    value: 'Dọn dẹp nhà',
    color: 'gray', // Màu xám cho trạng thái khởi tạo
  },
};

export const PackageName = {
  _1DAY: {
    key: '_1DAY',
    value: 'Gói lẻ (làm 1 lần)',
  },
  _1MONTH: {
    key: '_1MONTH',
    value: '1 tháng',
  },
  _2MONTH: {
    key: '_2MONTH',
    value: '2 tháng',
  },
  _3MONTH: {
    key: '_3MONTH',
    value: '3 tháng',
  },
  _4MONTH: {
    key: '_4MONTH',
    value: '4 tháng',
  },
};

export const PaymentType = {
  QR: {
    key: 'QR',
    value: 'Quét mã thanh toán',
  },
  CASH: {
    key: 'CASH',
    value: 'Tiền mặt',
  },
};

export const PostStatus = {
  INITIAL: {
    key: 'INITIAL',
    value: 'Khởi tạo',
    bgColor: 'bg-gray-400', // Màu xám cho trạng thái khởi tạo
  },
  SCHEDULED: {
    key: 'SCHEDULED',
    value: 'Đã lên lịch',
    bgColor: 'bg-blue-400', // Màu xanh dương cho trạng thái đã lên lịch
  },
  CANCELED: {
    key: 'CANCELED',
    value: 'Bị hủy',
    bgColor: 'bg-red-400', // Màu đỏ cho trạng thái bị hủy
  },
  DOING: {
    key: 'DOING',
    value: 'Đang làm',
    bgColor: 'bg-yellow-400', // Màu vàng cho trạng thái đang làm
  },
  COMPLETED: {
    key: 'COMPLETED',
    value: 'Hoàn thành',
    bgColor: 'bg-green-400', // Màu xanh lá cho trạng thái hoàn thành
  },
  FAILED: {
    key: 'FAILED',
    value: 'Thất bại',
    bgColor: 'bg-orange-400', // Màu cam cho trạng thái thất bại
  },
};

export const FreelancerWorkStatus = {
  INITIAL: {
    key: 'INITIAL',
    value: 'Gửi yêu cầu',
    bgColor: 'bg-blue-400', // Màu xám cho trạng thái khởi tạo
  },
  PROHIBITIVE: {
    key: 'PROHIBITIVE',
    value: 'Bị cấm',
    bgColor: 'bg-red-400', // Màu đỏ cho trạng thái bị hủy
  },
  WORK: {
    key: 'WORK',
    value: 'Đã đăng ký',
    bgColor: 'bg-green-400', // Màu xanh lá cho trạng thái hoàn thành
  },
  DISABLE: {
    key: 'DISABLE',
    value: 'Tạm dừng',
    bgColor: 'bg-gray-400', // Màu cam cho trạng thái thất bại
  },
};

export const TakePostStatus = {
  PENDING: {
    key: 'PENDING',
    value: 'Chờ xác nhận',
    bgColor: 'bg-gray-400', // Màu xám cho trạng thái khởi tạo
    priority: 1,
  },
  ACCEPTED: {
    key: 'ACCEPTED',
    value: 'Đã nhận làm',
    bgColor: 'bg-green-400', // Màu xanh dương cho trạng thái đã lên lịch
    priority: 2,
  },
  REJECTED: {
    key: 'REJECTED',
    value: 'Đã từ chối',
    bgColor: 'bg-red-400', // Màu đỏ cho trạng thái bị hủy
    priority: 0,
  },
};

export const WorkScheduleStatus = {
  INITIAL: {
    key: 'INITIAL',
    value: 'Sắp tới',
    bgColor: 'bg-gray-400', // Màu xám cho trạng thái khởi tạo
  },
  COMPLETED: {
    key: 'COMPLETED',
    value: 'Đã làm',
    bgColor: 'bg-green-400', // Màu xanh dương cho trạng thái đã lên lịch
  },
  CANCELLED: {
    key: 'CANCELLED',
    value: 'Đã hủy',
    bgColor: 'bg-red-400', // Màu đỏ cho trạng thái bị hủy
  },
};

export const ReturnCode = {
  SUCCESS: 1000,
};
