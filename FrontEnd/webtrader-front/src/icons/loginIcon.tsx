interface loginIconProp{
    height: number;
}

export const LoginIcon = (props:loginIconProp) =>  {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width={805.86/695 * props.height} height = {props.height} viewBox="0 0 805.86 695">
        <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="11" d="M257.5 689.5H5.5V5.5h252"/>
        <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" d="M490.58 504.21 219.14 347.5l271.44-156.71M219.86 347.5h576"/>
        </svg>
    );
}