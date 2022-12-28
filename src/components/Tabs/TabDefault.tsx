import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const TabsDefault = () => {
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
            >
                <Tab value="one" label="Terms Of Service"
                    sx={{
                        fontFamily: "Inter, sans-serif !important",
                        fontWeight: "600 !important",
                        letterSpacing: "1px",
                        margin: "0 1rem"
                    }}
                />
                <Tab value="two" label="Privacy Policy"
                    sx={{
                        fontFamily: "Inter, sans-serif !important",
                        fontWeight: "600 !important",
                        letterSpacing: "1px",
                        margin: "0 1rem"
                    }}
                />
                <Tab value="three" label="Medican"
                    sx={{
                        fontFamily: "Inter, sans-serif !important",
                        fontWeight: "600 !important",
                        letterSpacing: "1px",
                        margin: "0 1rem"
                    }}
                />
            </Tabs>
        </Box>
    );
}

export default TabsDefault;
