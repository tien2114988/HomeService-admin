import { toAbsoluteUrl } from '@/lib/helper';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const Error404: FC = () => {
  return (
    <>
      {/* Title */}
      <h1 className="font-bold text-4xl text-gray-900 mb-4">Lỗi!</h1>

      {/* Text */}
      <div className="font-semibold text-lg text-gray-500 mb-7">
        Bạn không thể truy cập trang này
      </div>

      {/* Illustration */}
      <div className="mb-3">
        <img
          src={toAbsoluteUrl('media/errors/404-error.png')}
          className="max-w-full max-h-[600px] dark:hidden"
          alt=""
        />
      </div>

      {/* Link */}
      <div className="mb-0">
        <Link
          to="/dashboard"
          className="btn btn-sm bg-blue-500 text-white px-4 py-2 rounded"
        >
          Về trang chủ
        </Link>
      </div>
    </>
  );
};

export { Error404 };
