import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PostModel, TakePostModel } from '@/models/Post';
import moment from 'moment';
import { normalizeCreatedAt } from '@/lib/utils';
import TakePostStatusBadge from './TakePostStatusBadge';
import { useNavigate } from 'react-router-dom';
import { UserModel } from '@/models/User';
import { TakePostStatus } from '@/lib/constant';
import { getFreelancersByPostId } from '@/services/postService';

interface FreelancerInfoProps {
  post: PostModel;
}

const FreelancerInfo: React.FC<FreelancerInfoProps> = ({ post }) => {
  const [takePosts, setTakePosts] = useState<TakePostModel[]>([]);
  const [selectedTakePost, setSelectedTakePost] =
    useState<TakePostModel | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTakePosts = async () => {
      const data = await getFreelancersByPostId(post.id);
      setTakePosts(data.items);
    };
    fetchTakePosts();
  }, []);

  const openModal = (takePost: TakePostModel) => {
    setSelectedTakePost(takePost);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTakePost(null);
    setIsModalOpen(false);
  };

  const navigateToFreelancer = (freelancer: UserModel) => {
    navigate(`/users/${freelancer.id}`);
  };

  const sortedTakePosts = [...takePosts].sort((a, b) => {
    const priorityA =
      TakePostStatus[a.status as keyof typeof TakePostStatus].priority;
    const priorityB =
      TakePostStatus[b.status as keyof typeof TakePostStatus].priority;
    return priorityB - priorityA;
  });

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h3 className="text-lg font-medium text-teal-700 mb-4">
        Thông tin người làm
      </h3>
      <div className="pb-4 text-gray-600">
        <span className="font-medium">Số freelancer đã nhận:</span>{' '}
        {post.numOfFreelancer} / {post.totalFreelancer}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
        {sortedTakePosts.map(takePost => (
          <Card
            key={takePost.id}
            className="p-4 hover:shadow-lg cursor-pointer transition space-y-2"
            onClick={() => openModal(takePost)}
          >
            <div className="flex flex-row justify-between items-center">
              <h3 className="font-semibold">{takePost.freelancer.name}</h3>
              <div className="text-gray-500">{takePost.freelancer.id}</div>
            </div>

            <div className="text-gray-600">
              <span className="font-medium">Lần cuối cập nhật:</span>{' '}
              {moment(normalizeCreatedAt(takePost.updatedAt))?.format(
                'DD/MM/YYYY HH:mm:ss',
              )}
            </div>

            <TakePostStatusBadge status={takePost.status} />
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="w-96">
          <DialogHeader className="flex flex-row justify-center item-centers">
            <DialogTitle>Thông Tin người làm</DialogTitle>
          </DialogHeader>
          {selectedTakePost && (
            <div className="space-y-3">
              <div>
                <strong>ID:</strong> {selectedTakePost.freelancer.id}
              </div>
              <p>
                <strong>Tên:</strong> {selectedTakePost.freelancer.name}
              </p>
              <div className="flex flex-row item-centers">
                <strong className="mr-2">Trạng thái:</strong>
                <TakePostStatusBadge status={selectedTakePost.status} />
              </div>

              <p>
                <strong>Lần cập nhật cuối:</strong>{' '}
                {moment(normalizeCreatedAt(selectedTakePost.updatedAt))?.format(
                  'DD/MM/YYYY HH:mm:ss',
                )}
              </p>
              <div
                className="text-cyan-600 underline cursor-pointer"
                onClick={() =>
                  navigateToFreelancer(selectedTakePost.freelancer)
                }
              >
                Xem chi tiết người làm
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={closeModal}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FreelancerInfo;
