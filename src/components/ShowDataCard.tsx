import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Idata } from "@/types/data";
import { FileTextIcon } from "lucide-react";

const ShowDataCard = ({ response }: { response: Idata }) => {
  // console.log(response);

  return (
    <Card className="w-[400px]">
      <CardHeader className="font-semibold flex items-center gap-2">
        <FileTextIcon className="w-5 h-5 text-blue-600" />
        {response.document}
      </CardHeader>
      <CardContent>{response.summary}</CardContent>
    </Card>
  );
};

export default ShowDataCard;
