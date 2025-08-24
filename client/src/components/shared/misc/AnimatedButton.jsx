const AnimatedButton = (props) => {
    return (
        <button
            {...props}
            className="animated-btn group"
            style={{
                "--primary": props.primary,
                "--base": props.secondary,
                "--text-before": props.textBeforeColor ,
                "--text-after": props.textAfterColor, 
                ...props.style
            }}
        >
            <span className="inner"></span>
            <span className="label inline-flex items-center gap-1 justify-center">{props.text} {props?.icon && props?.icon}</span>
        </button>
    )
}

export default AnimatedButton;