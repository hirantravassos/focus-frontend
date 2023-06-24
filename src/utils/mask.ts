import IMask from 'imask';

export function Mask(value: string | null, mask: string): {
    mask: string, raw: any
} {
    if (!value) {
        return {
            mask: ``,
            raw: ``
        }
    }

    let masked = IMask.createMask({
        mask: mask,
    });

    return {
        mask: masked.resolve(value),
        raw: masked.unmaskedValue
    }
}