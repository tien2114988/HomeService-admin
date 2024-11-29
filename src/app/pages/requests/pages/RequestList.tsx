import RequestTable from '../components/RequestTable';

const RequestList = () => {
  return (
    <div className="w-full">
      <div className="text-xl font-medium mb-2">
        Yêu cầu đăng ký dịch vụ từ Freelancers
      </div>
      <RequestTable />
    </div>
  );
};

export default RequestList;
