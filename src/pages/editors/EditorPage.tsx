import BackdropCustomize from 'components/BackdropCustomize';
import ButtonDefault from 'components/Button/ButtonDefault';
import TabDefault from 'components/Tabs/TabDefault';
import { useBoolean } from 'helpers/hooks';
import PageLayout from 'pages/layout/organisms/PageLayout';
import React from 'react';

const EditorPage = () => {
    const isLoadingPage = useBoolean();

    return (
        <PageLayout
            title="Editor"
            childrenAction={
                <div className="flex items-center justify-between h-full pr-8">
                    <div className="flex items-center w-max">
                        <TabDefault />
                    </div>
                </div>
            }
        >
            {isLoadingPage.value ? <BackdropCustomize /> : null}
        </PageLayout>
    )
}

export default EditorPage;