import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconBriefcase, IconCarambola, IconSchool, IconUser } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Gestion du CV</h1>
        <p>Remplissez les différentes sections de votre CV</p>
        <Tabs defaultValue="user" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="user"><IconUser />Personnel</TabsTrigger>
            <TabsTrigger value="experiences"><IconBriefcase />Expériences</TabsTrigger>
            <TabsTrigger value="formations"><IconSchool />Formations</TabsTrigger>
            <TabsTrigger value="competences"><IconCarambola />Compétences</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <div className="flex flex-col gap-4">
              Infos personnelles
            </div>
          </TabsContent>
          <TabsContent value="experiences"> 
            <div className="flex flex-col gap-4">
              Expériences
            </div>
          </TabsContent>
          <TabsContent value="formations"> 
            <div className="flex flex-col gap-4">
              Formations
            </div>
          </TabsContent>
          <TabsContent value="competences"> 
            <div className="flex flex-col gap-4">
              Compétences
            </div>
          </TabsContent>
        </Tabs>
      </main>

    </div>
  );
}
