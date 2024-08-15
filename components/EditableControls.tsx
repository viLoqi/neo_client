import { Button, ButtonGroup, Flex, IconButton, useEditableControls } from "@chakra-ui/react"
import { Check, X, PencilSimple } from "@phosphor-icons/react"

function EditableControls() {
    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
        <ButtonGroup justifyContent='center' >
            <IconButton aria-label="Confirm Edit" icon={<Check weight="thin" />} {...getSubmitButtonProps()} />
            <IconButton aria-label="Cancel Edit" icon={<X weight="thin" />} {...getCancelButtonProps()} />
        </ButtonGroup>
    ) : (
        < Button leftIcon={< PencilSimple />} color={"#285ADE"} maxW={'xs'}{...getEditButtonProps()}>
            Edit
        </Button >
    )
}

export default EditableControls