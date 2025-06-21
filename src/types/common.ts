// frontend/src/types/common.ts
export interface IInput {
    label?: string;
    name: string;
    variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
    size?: 'sm' | 'md' | 'lg';
    required?: boolean;
    type?: string;
    className?: string;
}