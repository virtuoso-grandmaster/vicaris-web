import { CollectionItem as CollectionItemType } from '@/components/ui/image-uploader';
import { motion } from 'framer-motion';

interface CollectionItemProps {
  item: CollectionItemType;
  index: number;
}

export const CollectionItem = ({ item, index }: CollectionItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 border border-border/50 group"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image_url || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
          width="400"
          height="400"
        />
        {item.sold && (
          <div className="absolute top-2 right-2 bg-destructive text-white px-2 py-1 rounded-full text-xs font-medium">
            Đã bán
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg text-ink line-clamp-2 mb-2">
          {item.name}
        </h3>
        {item.price && (
          <div className="flex justify-between items-center">
            <span className="text-leaf font-semibold">{item.price}</span>
            <span className="text-xs text-muted-foreground">
              {item.sold ? 'Đã bán' : 'Còn hàng'}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};