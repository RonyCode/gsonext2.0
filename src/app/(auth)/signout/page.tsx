import SignOutButtonDefault from '../../../../../teste/src/components/Buttoms/SignOutButton/SignOutButtonDefault'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/ui/alert-dialog'

const SignOut = ()=> {
  return (
    <>
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sua última sessão expirou!</AlertDialogTitle>
            <AlertDialogDescription>
              Para continuar, faça login novamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <SignOutButtonDefault />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
export default SignOut
