import { Editable, EditableInput, EditablePreview, Input, ListItem } from "@chakra-ui/react";

import EditableControls from "@/components/EditableControls";

const CardChoices = ({ choice }: { choice: string }) => {

    return (
        <ListItem className="">
            <Editable
                textAlign='center'
                defaultValue={choice}
                isPreviewFocusable={false}
                className="flex justify-between"
            >
                <EditablePreview />
                {/* Here is the custom input */}
                <Input as={EditableInput} />
                <EditableControls />
            </Editable>
        </ListItem>
    );
}

export default CardChoices;