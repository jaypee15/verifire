import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CreateBadgeDto } from '@/lib/types';
import { TagInput } from '@/components/ui/tag-input';

const badgeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  image: z.string().url('Must be a valid URL'),
  tags: z.array(z.string()).optional(),
  criteria: z.object({
    narrative: z.string().optional(),
    achievementType: z.string().optional(),
  }).optional(),
  validityPeriod: z.number().min(0).optional(),
});

interface BadgeFormProps {
  onSubmit: (data: CreateBadgeDto) => void;
  isLoading: boolean;
  defaultValues?: Partial<CreateBadgeDto>;
}

export function BadgeForm({ onSubmit, isLoading, defaultValues }: BadgeFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateBadgeDto>({
    resolver: zodResolver(badgeSchema),
    defaultValues,
  });

  const tags = watch('tags') || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name">Badge Name</label>
        <Input
          id="name"
          {...register('name')}
          error={errors.name?.message}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          {...register('description')}
          error={errors.description?.message}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="image">Image URL</label>
        <Input
          id="image"
          {...register('image')}
          error={errors.image?.message}
        />
      </div>

      <div className="space-y-2">
        <label>Tags</label>
        <TagInput
          value={tags}
          onChange={(newTags) => setValue('tags', newTags)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="validityPeriod">Validity Period (days)</label>
        <Input
          id="validityPeriod"
          type="number"
          {...register('validityPeriod', { valueAsNumber: true })}
          error={errors.validityPeriod?.message}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="criteria.narrative">Achievement Criteria</label>
        <Textarea
          id="criteria.narrative"
          {...register('criteria.narrative')}
          error={errors.criteria?.narrative?.message}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Creating...' : 'Create Badge'}
      </Button>
    </form>
  );
} 