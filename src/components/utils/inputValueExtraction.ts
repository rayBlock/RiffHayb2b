export function getValueForIdAndPropName(data: any[], id: string, propName: string) {
    const item = data.find((d) => d.id === id);
    if (item && item.props[propName]) {
      return item.props[propName];
    }
    return 'Value not found'; // You can customize this message
  }
  
  