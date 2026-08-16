import { firstFormInputs, inputClass, labelClass, secondFormInputs, sectionClass } from '@/constants'
import { FormInputsProps, FormState, InputConfig } from '@/types'
import { Text, TextInput, View } from 'react-native'
import Chips from './chips'
import Coordinates from './coordinates'
import BedBathCounter from './counter'

const FormInputs = ({ form, handleUpdateForm }: FormInputsProps) => {

    return (
        <>
            {firstFormInputs.map((input) => (
                <Input
                    key={input.key}
                    input={input}
                    form={form}
                    handleUpdateForm={handleUpdateForm}
                />
            ))}

            <Chips
                handleUpdateForm={handleUpdateForm}
                form={form}
            />

            <BedBathCounter
                handleUpdateForm={handleUpdateForm}
                form={form}
            />

            {secondFormInputs.map((input) => (
                <Input
                    key={input.key}
                    input={input}
                    form={form}
                    handleUpdateForm={handleUpdateForm}
                />
            ))}

            {/* Coordinates */}
            <Coordinates
                handleUpdateForm={handleUpdateForm}
                form={form}
            />
        </>
    )
}

export default FormInputs


const Input = ({
    input,
    form,
    handleUpdateForm
}: {
    input: InputConfig,
    form: FormState,
    handleUpdateForm: (fields: Partial<FormState>) => void
}) => {
    return (
        <View className={sectionClass}>
            <Text className={labelClass}>{input.label}</Text>
            <TextInput
                className={`${inputClass} ${input.extraInputClass || ''}`.trim()}
                placeholder={input.placeholder}
                placeholderTextColor='#9ca3af'
                value={form[input.key] as string}
                onChangeText={(text) => handleUpdateForm({ [input.key]: text })}
                style={{ color: '#1f2937' }}
                keyboardType={input.keyboardType}
                multiline={input.multiline}
                textAlignVertical={input.multiline ? 'top' : undefined}
            />
            {input.helperText && (
                <Text className='text-xs text-gray-500 mt-1.5 ml-1'>
                    {input.helperText}
                </Text>
            )}
        </View>
    )
}