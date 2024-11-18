import { useQuery } from '@tanstack/react-query';
import { badgesApi } from '@/lib/api/badges';
import { Card } from '@/components/ui/card';
import { Badge } from '@/lib/types';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface TemplateSelectorProps {
  onSelect: (template: Badge) => void;
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const { data: templates, isLoading } = useQuery({
    queryKey: ['badge-templates'],
    queryFn: badgesApi.getTemplates,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!templates?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No templates available. Create a template first.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {templates.map((template) => (
        <Card
          key={template.id}
          className="p-4 cursor-pointer hover:border-primary"
          onClick={() => onSelect(template)}
        >
          <img
            src={template.image}
            alt={template.name}
            className="w-full h-32 object-contain mb-4"
          />
          <h3 className="font-medium">{template.name}</h3>
          <p className="text-sm text-muted-foreground">{template.description}</p>
        </Card>
      ))}
    </div>
  );
} 