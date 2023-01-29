import React from "react";
import GsapPreloader from "../sharedComponents/preloaders/gsapPreloader";

export default {
    component: GsapPreloader,
    title: 'gsapPreloader',
    decorator: (Story: any) => {
        <div className="w-full h-full bg-blue flex justify-center items-start">
            <Story />
        </div>
    }
}

const Template = (args: any) => <GsapPreloader underlyingComponent={<h1>hi</h1>} dataIsLoaded={false}/>

export const Default = Template.bind({})