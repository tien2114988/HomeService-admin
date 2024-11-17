// enum.ts
type EnumType = { [key: string]: string };

const UserStatus: EnumType = {
  ACTIVE: 'Hoạt động',
  PROHIBITIVE: 'Bị cấm',
};

const Gender: EnumType = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
};

// Hàm lấy giá trị từ key
export const getEnumValue = (enumObj: EnumType, key: string): string => {
  return enumObj[key] || 'Không xác định';
};

export { UserStatus, Gender };
