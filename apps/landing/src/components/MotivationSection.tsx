import type React from "react";
import ReactHtmlParser from "react-html-parser";

import { Button } from "@workspace/ui/components/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@workspace/ui/components/drawer";
import { cn } from "@workspace/ui/lib/utils";

import verifiedImg from "@/assets/verified.png";

const features = [
  {
    title: "&#x1F680; Возможность развития",
    description:
      "Я верю, что данная вакансия позволит мне развиваться в профессиональном плане. Позиция Fullstack уже давно является моей целью, и я готов к новым вызовам.",
  },
  {
    title: "&#x1F331; Карьерный рост",
    description:
      "Сейчас у меня напрочь отсутствует карьерный рост. Его просто не существует. Он не предусмотрен. Я хочу развиваться и расти вместе с Вашей компанией.",
  },
  {
    title: "&#x1F3C6; Интерес к проекту",
    description:
      "Мне интересен проект Ton Society, и я хочу внести свой вклад в его развитие. Меня впечатляют Ваша миссия и цели. Я уверен, что мои навыки и опыт помогут Вам достичь Ваших целей.",
  },
];

export const MotivationSection: React.FC<Omit<React.ComponentPropsWithoutRef<"div">, "children">> = ({
  className,
  ...props
}) => (
  <div {...props} className={cn("container pt-[2rem] md:pt-[10rem]", className)}>
    <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight text-center">Мотивация</h1>
    <p className="text-center sm:text-lg md:text-xl text-black/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
      Что побудило меня так активно бороться за данную вакансию?
    </p>
    <div className="flex flex-col gap-2">
      {features.map(({ title, description }, index) => (
        <div key={index} className="bg-white py-2">
          <h3 className="text-xl font-semibold mb-2">{ReactHtmlParser(title)}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      ))}
    </div>
    <div className="flex flex-col gap-4 items-center mt-8">
      <Drawer>
        <DrawerTrigger asChild>
          <Button size="lg" className="uppercase w-fit">
            И еще кое-что
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full">
            <div className="container flex flex-col items-center gap-8 py-10">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight text-center">
                Я тоже хочу офигенную иконку в профиль
              </h1>
              <img
                src={verifiedImg}
                alt="verified"
                className="rounded-xl transition-all shadow hover:scale-105 hover:-translate-y-1.5 hover:shadow-2xl"
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  </div>
);
