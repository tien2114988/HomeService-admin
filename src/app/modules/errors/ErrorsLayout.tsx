import { toAbsoluteUrl } from '@/lib/helper';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const ErrorsLayout = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${toAbsoluteUrl(
      'media/errors/bg.jpg',
    )})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';

    return () => {
      document.body.style.backgroundImage = ''; // Clear on unmount
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="flex flex-col items-center text-center p-10">
          <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg py-5">
            <div className="py-15 lg:py-15">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ErrorsLayout };
