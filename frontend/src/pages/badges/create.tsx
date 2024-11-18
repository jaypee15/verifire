import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { badgesApi } from '@/lib/api/badges';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { BadgeForm } from './components/badge-form';
import { CreateBadgeDto } from '@/lib/types';

export function CreateBadgePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [useTemplate, setUseTemplate] = useState(false);

  const createBadgeMutation = useMutation({
    mutationFn: badgesApi.createBadge,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Badge created successfully',
      });
      navigate('/badges');
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create badge',
      });
    },
  });

  const handleSubmit = (data: CreateBadgeDto) => {
    createBadgeMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create Badge</h1>
        <p className="text-muted-foreground">
          Create a new badge to issue to recipients
        </p>
      </div>

      <div className="flex space-x-4">
        <Button
          variant={useTemplate ? 'outline' : 'default'}
          onClick={() => setUseTemplate(false)}
        >
          Create New Badge
        </Button>
        <Button
          variant={useTemplate ? 'default' : 'outline'}
          onClick={() => setUseTemplate(true)}
        >
          Use Template
        </Button>
      </div>

      {useTemplate ? (
        <TemplateSelector onSelect={handleSubmit} />
      ) : (
        <BadgeForm onSubmit={handleSubmit} isLoading={createBadgeMutation.isPending} />
      )}
    </div>
  );
}

// Add default export
export default CreateBadgePage; 