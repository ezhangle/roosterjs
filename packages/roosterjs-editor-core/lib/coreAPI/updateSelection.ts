import EditorCore from '../editor/EditorCore';
import getSelection from './getSelection';
import hasFocus from './hasFocus';
import isRangeInContainer from '../utils/isRangeInContainer';

export default function updateSelection(core: EditorCore, range: Range): boolean {
    let selectionUpdated = false;
    if (isRangeInContainer(range, core.contentDiv)) {
        let selection = getSelection(core);
        if (selection) {
            // Workaround IE exception 800a025e
            if (selection.rangeCount > 0 && selection.getRangeAt(0).getClientRects().length) {
                selection.removeAllRanges();
            }

            selection.addRange(range);
            if (!hasFocus(core)) {
                core.cachedSelectionRange = range;
            }

            selectionUpdated = true;
        }
    }

    return selectionUpdated;
}