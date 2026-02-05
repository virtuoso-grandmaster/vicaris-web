import { useCollections } from '@/hooks/useCollections';

interface CollectionOrderTestProps {
  productId: string;
}

export const CollectionOrderTest = ({ productId }: CollectionOrderTestProps) => {
  const { data: collections, isLoading, error } = useCollections(productId);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Đang kiểm tra thứ tự bộ sưu tập...</p>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-2">Lỗi kiểm tra thứ tự:</h3>
        <p className="text-red-600 text-sm">{error.message}</p>
        {error.message.includes('order') && (
          <div className="mt-2 p-2 bg-red-100 rounded">
            <p className="text-red-700 text-xs">
              Lỗi liên quan đến cột 'order'. Vui lòng kiểm tra xem cột 'order' 
              đã được thêm vào bảng 'shopee_collections' trong cơ sở dữ liệu chưa.
            </p>
          </div>
        )}
      </div>
    );
  }

  if (!collections || collections.length === 0) {
    return <p className="text-sm text-muted-foreground">Không có bộ sưu tập nào để kiểm tra.</p>;
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-green-800 font-semibold mb-2">Thứ tự bộ sưu tập hiện tại:</h3>
      <div className="space-y-2">
        {collections.map((collection, index) => (
          <div key={collection.id} className="flex items-center justify-between p-2 bg-white rounded">
            <span className="text-sm font-medium">{collection.name}</span>
            <div className="flex gap-4 text-xs text-gray-600">
              <span>Thứ tự: {collection.order ?? 'null'}</span>
              <span>Index: {index}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-gray-600">
        Nếu thứ tự hiển thị đúng (từ nhỏ đến lớn), thì chức năng sắp xếp đang hoạt động.
      </div>
    </div>
  );
};