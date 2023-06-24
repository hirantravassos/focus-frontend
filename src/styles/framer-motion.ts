export const animationDefault = {
    initial: {opacity: 0, left: -5},
    animate: {opacity: 1, left: 0},
    transition: {duration: 0.4},
};

export const animationPopUp = {
    animate: {
        opacity: 1,
        scale: [0, 1],
        borderRadius: ['100%', '4px'],
    },
    exit: {
        opacity: 0,
        scale: 0,
        borderRadius: '100%'
    },
    transition: {
        duration: 0.1,
        ease: 'easeOut',
    }
}