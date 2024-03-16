
const ErrorNetworkToast = (error, toast) =>{
  if (error?.message === 'Network Error') {
    console.log('masuk sinii');
    return toast({
      title: "Please check your connection",
      status: "warning",
      variant: "top-accent",
      description: error.message,
    });
  }
}

export default ErrorNetworkToast;