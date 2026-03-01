import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CertificationCardProps {
  title: string;
  caption: string;
  imagePath?: string;
}

export default function CertificationCard({
  title,
  caption,
  imagePath,
}: CertificationCardProps) {
  if (!imagePath) {
    return (
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{caption}</CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="w-full text-left cursor-pointer"
          aria-label={`View ${title} certificate`}
        >
          <Card className="w-full bg-white transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{caption}</CardDescription>
            </CardContent>
          </Card>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{caption}</DialogDescription>
        </DialogHeader>
        <img
          src={imagePath}
          alt={`${title} certificate`}
          className="w-full h-auto max-h-[80vh] object-contain rounded-base border-2 border-border"
        />
      </DialogContent>
    </Dialog>
  );
}
