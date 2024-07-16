import { useRef, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import { Button, Checkbox, FormControlLabel, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const MultiSelect: FC<{
  label: string;
  onChange?: (value: any[]) => void;
  options: { label: string; value: unknown }[];
  value: any[];
}> = (props) => {
  const { label, onChange, options, value = [], ...other } = props;
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleOpenMenu = (): void => {
    setOpenMenu(true);
  };

  const handleCloseMenu = (): void => {
    setOpenMenu(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let newValue = [...value];

    if (event.target.checked) {
      newValue.push(event.target.value);
    } else {
      newValue = newValue.filter((item) => item !== event.target.value);
    }

    onChange?.(newValue);
  };

  return (
    <>
      <Button color="inherit" endIcon={<ExpandMoreIcon fontSize="small" />} onClick={handleOpenMenu} ref={anchorRef} {...other}>
        {label}
      </Button>
      <Menu anchorEl={anchorRef.current} onClose={handleCloseMenu} open={openMenu} PaperProps={{ style: { width: 250 } }}>
        {options.map((option) => (
          <MenuItem key={option.label}>
            <FormControlLabel
              control={<Checkbox checked={value.includes(option.value)} onChange={handleChange} value={option.value} />}
              label={option.label}
              sx={{
                flexGrow: 1,
                mr: 0,
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
