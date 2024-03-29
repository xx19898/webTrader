import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import LoginPage from '../pages/loginAndRegister/loginPage';
import loginPage from '../pages/loginAndRegister/loginPage';

export default {
    title: 'LoginPage',
    component: loginPage, 
    parameters:{
        layout: 'fullscreen'
    },
} as ComponentMeta<typeof LoginPage>

const Template: ComponentStory<typeof LoginPage> = (args:any) => <LoginPage {...args}/>

export const Default = Template.bind({})