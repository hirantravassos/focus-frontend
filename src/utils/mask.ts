import IMask from 'imask';

export function Mask(value: string, mask: string): {
    mask: string, raw: any
} {
    let masked = IMask.createMask({
        mask: mask,
    });

    return {
        mask: masked.resolve(value),
        raw: masked.unmaskedValue
    }
}