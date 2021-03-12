import {Theme, createStyles} from "@material-ui/core";

export const Styles = (theme: Theme) => createStyles({
  input: {
    paddingLeft: "10px",
    color: theme.palette.text.primary,
    "& .Mui-disabled": {
      color: theme.palette.text.primary
    }
  },
  inputInFocus: {
    background: theme.palette.grey[100]
  },
  completed: {
    textDecoration: "line-through"
  },
  clickAwayListener: {
    display: 'flex',
    flexGrow: 1,
    flexBasis: 'auto'
  }
});