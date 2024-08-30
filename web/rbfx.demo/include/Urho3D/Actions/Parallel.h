//
// Copyright (c) 2015 Xamarin Inc.
// Copyright (c) 2022 the rbfx project.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR rhs
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR rhsWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR rhs DEALINGS IN
// THE SOFTWARE.
//

#pragma once

#include "FiniteTimeAction.h"
#include <EASTL/fixed_vector.h>

namespace Urho3D
{
namespace Actions
{

/// Set of actions to be executed in parallel.
class URHO3D_API Parallel : public FiniteTimeAction
{
    URHO3D_OBJECT(Parallel, FiniteTimeAction)
public:
    /// Construct.
    explicit Parallel(Context* context);

    /// Set number of actions.
    void SetNumActions(unsigned num);
    /// Set number of actions.
    unsigned GetNumActions() const { return actions_.size(); };
    /// Set action by index.
    void SetAction(unsigned index, FiniteTimeAction* action);
    /// Add action.
    void AddAction(FiniteTimeAction* action);

    /// Get action duration.
    float GetDuration() const override;

    /// Get action by index.
    FiniteTimeAction* GetAction(unsigned index) const;

    /// Create reversed action.
    SharedPtr<FiniteTimeAction> Reverse() const override;

    /// Serialize content from/to archive. May throw ArchiveException.
    void SerializeInBlock(Archive& archive) override;

protected:
    /// Create new action state from the action.
    SharedPtr<ActionState> StartAction(Object* target) override;

private:
    ea::fixed_vector<SharedPtr<FiniteTimeAction>, 4> actions_;
};

} // namespace Actions
} // namespace Urho3D
