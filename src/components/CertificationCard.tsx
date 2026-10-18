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
  image?: { src: string; width: number; height: number };
}

export default function CertificationCard({
  title,
  caption,
  image,
}: CertificationCardProps) {
  if (!image) {
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
          className="w-full cursor-pointer text-left"
          aria-label={`View ${title} certificate`}>
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
          src={image.src}
          width={image.width}
          height={image.height}
          alt={`${title} certificate`}
          className="h-auto max-h-[80vh] w-full rounded-base border-2 border-border object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
