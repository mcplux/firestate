export const propertySchema = {
  title(value: any) {
    if(!value) {
      return 'The property title is required'
    }

    if(value.length < 6) {
      return 'The property must be at least 6 characters long.'
    }

    return true
  },
  price(value: any) {
    const regex = /^[0-9]+$/

    if(!regex.test(value)) {
      return 'Price is required and must be a number.'
    }

    return true
  },
  bedrooms(value: any) {
    if(!value && value != 0) {
      return 'Select an option.'
    }
    
    return true
  },
  baths(value: any) {
    if(!value && value != 0) {
      return 'Select an option.'
    }
  
    return true
  },
  parkings(value: any) {
    if(!value && value != 0) {
      return 'Select an option.'
    }
    
    return true
  },
  description(value: any) {
    if(!value) {
      return 'Description is required.'
    }

    return true
  }
}

export const imageSchema = {
  image(value: any) {
    if(!value) {
      return 'Image field is required'
    }

    return true
  }
}
