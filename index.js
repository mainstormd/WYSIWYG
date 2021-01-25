let toolkitButtons = document.querySelectorAll('.toolkit button');
      
      for(let button of toolkitButtons)
       button.addEventListener('click',ToolkitButtonsClickHandler);

      var editArea = document.querySelector('.edit-area');

      editArea.addEventListener('copy', (event) => {
          const selection = document.getSelection();
          rangeSelection = selection.getRangeAt(0); 

          var contents = rangeSelection.cloneContents()

          var ancestorContainer = rangeSelection.commonAncestorContainer;
          
          if(ancestorContainer.tagName === "SPAN")
          {
            let interimSpan = document.createElement('span');
                interimSpan.append(contents);
                interimSpan.className = ancestorContainer.className;

                let classListAncestor = ancestorContainer.classList;
                
                if(classListAncestor.containts("header1-text") ||
                    ancestorContainer.classList.containts("header2-text"))
                {
                  let interimDiv = document.createElement('div');
                  interimDiv.append(interimSpan);
                  contents = interimDiv;
                }    
          }

          var editArea = document.querySelector('.edit-area');
          var element = document.createElement('div')
          element.style.content = "hidden";
          element.append(contents);
          editArea.append(element);
          var s = element.getElementsByTagName('span');

          for( item of s )
              item.style = window.getComputedStyle(item).cssText;

          event.clipboardData.setData("text/html", element.innerHTML)
          event.clipboardData.setData("text/plain", element.textContent);
          this.editArea.removeChild(element);
          event.preventDefault();
      });

      editArea.addEventListener('cut', (event) => {
          const selection = document.getSelection();
          rangeSelection = selection.getRangeAt(0); 

          var contents = rangeSelection.cloneContents();

          var ancestorContainer = rangeSelection.commonAncestorContainer;
          
          if(ancestorContainer.tagName === "SPAN")
          {
            let interimSpan = document.createElement('span');
                interimSpan.append(contents);
                interimSpan.className = ancestorContainer.className;

                let classListAncestor = ancestorContainer.classList;
                
                if(classListAncestor.containts("header1-text") ||
                    ancestorContainer.classList.containts("header2-text"))
                {
                  let interimDiv = document.createElement('div');
                  interimDiv.append(interimSpan);
                  contents = interimDiv;
                }    
          }
          
          var editArea = document.querySelector('.edit-area');
          var element = document.createElement('div')
          element.style.content = "hidden";
          element.append(contents);
          editArea.append(element);
          var s = element.getElementsByTagName('span');

          for( item of s )
              item.style = window.getComputedStyle(item).cssText;

          event.clipboardData.setData("text/html", element.innerHTML)
          event.clipboardData.setData("text/plain", element.textContent);
          this.editArea.removeChild(element);
          selection.deleteFromDocument();
          event.preventDefault();
      });

    function ToolkitButtonsClickHandler()
    {
        let command = this.dataset.command;

        let comandClasses = {
                             'h1':'header1-text',
                             'h2':'header2-text',
                             'bold':'bold-text',
                             'italic':'italic-text'
                            };

        let selection = window.getSelection();
        
        if( selection != "" && isEditorSelection(selection) ) 
        {
            let rangeSelection = selection.getRangeAt(0);

            let tagName = 'span';

            let node = document.createElement(tagName);
                node.classList.add(comandClasses[command]);
                node.append(rangeSelection.cloneContents());

            if(command == "h1" || command == "h2")
            {
                let interimElement = document.createElement('div');
                interimElement.append(node);
                node = interimElement;
            }

            rangeSelection.deleteContents();
            rangeSelection.insertNode(node);

            //delete br
            var brElement = document.getElementsByTagName('br')[0];
          
            if (brElement)
            {
                var brParent = brElement.parentElement;
                brParent.removeChild(brElement);
            }
        }
    }
      
    function isEditorSelection( selection )
    {
      if(selection != null)
      {
        let parent = selection.anchorNode.parentElement;
        while(parent != null )
        {    
            if(parent.classList.contains("edit-area"))
            {
                return true;
            }
          parent = parent.parentElement;  
        }
      }
      return false;
    }