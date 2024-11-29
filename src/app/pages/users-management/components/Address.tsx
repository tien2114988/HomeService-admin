import React, { useState } from 'react';
import { AddressModel } from '@/models/User';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Phone, MapPin } from 'lucide-react';

interface AddressProps {
  addresses: AddressModel[];
}

const Address: React.FC<AddressProps> = ({ addresses }) => {
  const [selectedAddress, setSelectedAddress] = useState<AddressModel | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (address: AddressModel) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAddress(null);
    setIsModalOpen(false);
  };

  // Sắp xếp địa chỉ mặc định lên đầu
  const sortedAddresses = [...addresses].sort((a, b) => {
    if (a.default && !b.default) {
      return -1;
    }
    if (!a.default && b.default) {
      return 1;
    }
    return 0;
  });

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAddresses.length > 0 ? (
          sortedAddresses.map(address => (
            <Card
              key={address.id}
              className="p-4 hover:shadow-lg cursor-pointer transition space-y-2"
              onClick={() => openModal(address)}
            >
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {address.customerName}
                </h3>
                {address.default && (
                  <CheckCircle className="text-green-500" size={20} />
                )}
              </div>
              <div className="flex flex-row space-x-2">
                <Phone size={20} className="text-cyan-600" />
                <div className="text-gray-500">{address.phoneNumber}</div>
              </div>

              <div className="flex flex-row items-center space-x-2">
                <MapPin size={20} className="text-red-600" />
                <div className="text-gray-500 line-clamp-1 max-w-xs">
                  {address.detail}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div>Chưa cập nhật</div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader className="flex flex-row justify-center item-centers">
            <DialogTitle>Thông Tin Địa Chỉ</DialogTitle>
          </DialogHeader>
          {selectedAddress && (
            <div className="space-y-3">
              <p>
                <strong>Tên khách hàng:</strong> {selectedAddress.customerName}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {selectedAddress.phoneNumber}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {selectedAddress.detail}
              </p>
              {selectedAddress.default && (
                <p className="text-green-500">Địa chỉ mặc định</p>
              )}
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

export default Address;
